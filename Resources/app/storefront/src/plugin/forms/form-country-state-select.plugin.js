import Plugin from 'src/plugin-system/plugin.class';
import DomAccess from 'src/helper/dom-access.helper';
import HttpClient from 'src/service/http-client.service';

/**
 * @package content
 */
export default class CountryStateSelectPlugin extends Plugin {

    static options = {
        countrySelectSelector: '.country-select',
        countryStateSelectSelector: '.country-state-select',
        countryStateCitySelectSelector: '.country-state-city-select',
        countryStateCityDistrictSelectSelector: '.country-state-city-district-select',

        initialCountryAttribute: 'initial-country-id',
        initialCountryStateAttribute: 'initial-country-state-id',
        initialCityAttribute: 'initial-city-id',
        initialDistrictAttribute: 'initial-district-id',
        countryStatePlaceholderSelector: '[data-placeholder-option="true"]',
        countryStateCityPlaceholderSelector: '[data-city-placeholder-option]',
        countryStateCityDistrictPlaceholderSelector: '[data-district-placeholder-option]',
        vatIdFieldInput: '#vatIds',
        zipcodeFieldInput: '[data-input-name="zipcodeInput"]',
        vatIdRequired: 'vat-id-required',
        stateRequired: 'state-required',
        zipcodeRequired: 'zipcode-required',
        zipcodeLabel: '#zipcodeLabel',
        scopeElementSelector: null,
        prefix: null,
    };

    init() {
        this.initClient();
        this.initSelects();

        this._getFormFieldToggleInstance();
        this._country = {};
        if (this._formFieldToggleInstance) {
            this._formFieldToggleInstance.$emitter.subscribe('onChange', this._onFormFieldToggleChange.bind(this));
        }
    }

    initClient() {
        this._client = new HttpClient();
    }

    initSelects() {
        this.scopeElement = this.el;

        if (this.options.scopeElementSelector) {
            this.scopeElement = DomAccess.querySelector(document, this.options.scopeElementSelector);
        }

        const {
            countrySelectSelector,
            countryStateSelectSelector,
            countryStateCitySelectSelector,
            countryStateCityDistrictSelectSelector,
            initialCountryAttribute,
            initialCountryStateAttribute,
            initialCityAttribute,
            initialDistrictAttribute,
        } = CountryStateSelectPlugin.options;

        const selectsConfig = [
            {
                selector: countrySelectSelector,
                initialAttribute: initialCountryAttribute,
                changeHandler: this.onChangeCountry.bind(this),
            },
            {
                selector: countryStateSelectSelector,
                initialAttribute: initialCountryStateAttribute,
                changeHandler: this.onChangeCountryState.bind(this),
            },
            {
                selector: countryStateCitySelectSelector,
                initialAttribute: initialCityAttribute,
                changeHandler: this.onChangeCountryStateCity.bind(this),
            },
            {
                selector: countryStateCityDistrictSelectSelector,
                initialAttribute: initialDistrictAttribute,
            },
        ];

        this.selectElements = {};
        selectsConfig.forEach(({selector, initialAttribute, changeHandler}) => {
            const selectElement = DomAccess.querySelector(this.scopeElement, selector);
            this.selectElements[selector] = {
                element: selectElement,
                initialValue: DomAccess.getDataAttribute(selectElement, initialAttribute),
            };

            if (changeHandler) {
                selectElement.addEventListener('change', changeHandler);
            }
        });

        const {initialValue: initialCountryId} = this.selectElements[countrySelectSelector];
        const {initialValue: initialCountryStateId} = this.selectElements[countryStateSelectSelector];
        const {initialValue: initialCityId} = this.selectElements[countryStateCitySelectSelector];
        const {initialValue: initialDistrictId} = this.selectElements[countryStateCityDistrictSelectSelector];

        if (!initialCountryId) {
            return;
        }

        this._countryId = initialCountryId;
        this._stateId = initialCountryStateId;
        const countrySelect = DomAccess.querySelector(this.scopeElement, countrySelectSelector);

        const countrySelectCurrentOption = countrySelect.options[countrySelect.selectedIndex];
        const stateRequired = !!DomAccess.getDataAttribute(countrySelectCurrentOption, this.options.stateRequired, false);

        this.requestStateData(initialCountryId, initialCountryStateId, stateRequired, initialCityId, initialDistrictId);

        const vatIdRequired = !!DomAccess.getDataAttribute(countrySelectCurrentOption, this.options.vatIdRequired, false);
        const vatIdInput = document.querySelector(this.options.vatIdFieldInput);
        const zipcodeLabels = DomAccess.querySelectorAll(document, this.options.zipcodeLabel, false);
        const zipcodeInputs = DomAccess.querySelectorAll(document, this.options.zipcodeFieldInput, false);
        const zipcodeRequired = !!DomAccess.getDataAttribute(countrySelectCurrentOption, this.options.zipcodeRequired, false);

        if (zipcodeRequired) {
            this._updateZipcodeRequired(zipcodeLabels, zipcodeInputs, zipcodeRequired);
        }

        if (!vatIdInput) {
            return;
        }
        this._updateRequiredVatId(vatIdInput, vatIdRequired);
    }

    onChangeCountryState(event) {
        this._stateId = event.target.value;

        const {
            countryStateCitySelectSelector,
            countryStateCityPlaceholderSelector,
        } = CountryStateSelectPlugin.options;

        updateStateSelect(
            {
                stateRequired: false,
                states: Object.values(this._country[this._countryId][this._stateId].children),
            },
            null,
            this.el,
            countryStateCitySelectSelector,
            countryStateCityPlaceholderSelector
        );
        this.onChangeCountryStateCity({target: {value: null}});
    }

    onChangeCountryStateCity(event) {
        const cityId = event.target.value;

        const {
            countryStateCityDistrictSelectSelector,
            countryStateCityDistrictPlaceholderSelector,
        } = CountryStateSelectPlugin.options;
        const children = cityId
            ? Object.values(this._country[this._countryId][this._stateId].children[cityId]?.children || [])
            : [];
        updateStateSelect(
            {
                stateRequired: false,
                states: children,
            },
            null,
            this.el,
            countryStateCityDistrictSelectSelector,
            countryStateCityDistrictPlaceholderSelector
        );
    }

    onChangeCountry(event) {
        const countryId = event.target.value;
        this._countryId = countryId;
        const countrySelect = event.target.options[event.target.selectedIndex];
        const stateRequired = !!DomAccess.getDataAttribute(countrySelect, this.options.stateRequired);
        this.requestStateData(countryId, null, stateRequired);

        const vatIdRequired = DomAccess.getDataAttribute(countrySelect, this.options.vatIdRequired);
        const vatIdInput = document.querySelector(this.options.vatIdFieldInput);

        const zipcodeLabels = DomAccess.querySelectorAll(this.scopeElement, this.options.zipcodeLabel, false);
        const zipcodeInputs = DomAccess.querySelectorAll(this.scopeElement, this.options.zipcodeFieldInput, false);
        const zipcodeRequired = !!DomAccess.getDataAttribute(countrySelect, this.options.zipcodeRequired, false);

        this._updateZipcodeRequired(zipcodeLabels, zipcodeInputs, zipcodeRequired);

        if (vatIdInput) {
            this._updateRequiredVatId(vatIdInput, vatIdRequired);
        }
    }

    requestStateData(countryId, countryStateId, stateRequired, cityId, districtId) {
        const payload = JSON.stringify({countryId});

        this._client.post(
            window.router['frontend.country.country-data'],
            payload,
            (response) => {
                const responseData = JSON.parse(response);
                responseData.stateRequired = stateRequired;

                this._country[countryId] = preprocessStateData(responseData.states);

                const {countryStateSelectSelector, countryStatePlaceholderSelector} = CountryStateSelectPlugin.options;

                updateStateSelect(
                    responseData,
                    countryStateId,
                    this.el,
                    countryStateSelectSelector,
                    countryStatePlaceholderSelector
                );
                const {
                    countryStateCitySelectSelector,
                    countryStateCityDistrictSelectSelector,
                } = CountryStateSelectPlugin.options;

                if (countryStateId) {
                    this.selectElements[countryStateSelectSelector].element.value = countryStateId;
                    this.onChangeCountryState({target: {value: countryStateId}});
                }

                if (cityId) {
                    this.selectElements[countryStateCitySelectSelector].element.value = cityId;
                    this.onChangeCountryStateCity({target: {value: cityId}});
                }

                if (districtId) {
                    this.selectElements[countryStateCityDistrictSelectSelector].element.value = districtId;
                }
            }
        );
    }


    _updateRequiredVatId(vatIdFieldInput, vatIdRequired) {
        if (this._differentShippingCheckbox && this.options.prefix === 'billingAddress') {
            return;
        }

        const label = vatIdFieldInput.parentNode.querySelector('label');

        if (vatIdRequired) {
            vatIdFieldInput.setAttribute('required', 'required');

            if (label?.textContent && label.textContent.substr(-1, 1) !== '*') {
                label.textContent = `${label.textContent}*`;
            }

            return;
        }

        if (label?.textContent && label.textContent.substr(-1, 1) === '*') {
            label.textContent = label.textContent.substr(0, label.textContent.length - 1);
        }

        vatIdFieldInput.removeAttribute('required');
    }

    _updateZipcodeRequired(labels, inputs, required) {
        if (!labels || !inputs) {
            return;
        }

        labels.forEach(label => {
            label.className = required ? '' : 'd-none';
        });

        inputs.forEach(input => {
            if (required) {
                input.setAttribute('required', 'required');
            } else {
                input.removeAttribute('required');
            }
        });
    }

    _getFormFieldToggleInstance() {
        const toggleField = DomAccess.querySelector(document, '[data-form-field-toggle-target=".js-form-field-toggle-shipping-address"]', false);
        if (!toggleField) {
            return;
        }

        this._formFieldToggleInstance = window.PluginManager.getPluginInstanceFromElement(toggleField, 'FormFieldToggle');
    }

    _onFormFieldToggleChange(event) {
        this._differentShippingCheckbox = event.target.checked;

        const scopeElementSelector = this._differentShippingCheckbox ? '.register-shipping' : '.register-billing';
        const scopeElement = DomAccess.querySelector(document, scopeElementSelector);

        const countrySelect = DomAccess.querySelector(scopeElement, this.options.countrySelectSelector);
        const countrySelectCurrentOption = countrySelect.options[countrySelect.selectedIndex];

        const vatIdRequired = !!DomAccess.getDataAttribute(countrySelectCurrentOption, this.options.vatIdRequired, false);
        const vatIdInput = document.querySelector(this.options.vatIdFieldInput);

        if (!vatIdInput) {
            return;
        }

        this._updateRequiredVatId(vatIdInput, vatIdRequired);
    }
}

function updateStateSelect({stateRequired, states}, countryStateId,
    rootElement, selector, placeholderSelector) {

    const countryStateSelect = DomAccess.querySelector(rootElement, selector);

    removeOldOptions(countryStateSelect, `option:not(${placeholderSelector})`);
    addNewStates(countryStateSelect, states, countryStateId);
    updateRequiredState(countryStateSelect, stateRequired, `option${placeholderSelector}`);
}

function removeOldOptions(el, optionQuery) {
    el.querySelectorAll(optionQuery).forEach((option) => option.remove());
}

function addNewStates(selectEl, states, selectedStateId) {
    if (selectEl === null) {
        return;
    }
    if (states.length === 0) {
        selectEl.setAttribute('disabled', 'disabled');
        return;
    }
    states.map(option => createOptionFromState(option, selectedStateId))
        .forEach((option) => {
            selectEl.append(option);
        });
    selectEl.parentNode.classList.remove('d-none');
    selectEl.removeAttribute('disabled');
}

function createOptionFromState(state, selectedStateId) {
    const option = document.createElement('option');

    option.setAttribute('value', state.id);
    option.innerText = state.translated.name;

    if (state.id === selectedStateId) {
        option.setAttribute('selected', 'selected');
    }

    return option;
}

function updateRequiredState(countryStateSelect, stateRequired, placeholderQuery) {
    const placeholder = countryStateSelect.querySelector(placeholderQuery);
    if (!placeholder) {
        return;
    }
    const label = countryStateSelect.parentNode.querySelector('label');

    if (stateRequired) {
        placeholder.setAttribute('disabled', 'disabled');
        countryStateSelect.setAttribute('required', 'required');

        if (label?.textContent && label.textContent.substr(-1, 1) !== '*') {
            label.textContent = `${label.textContent.trim()}*`;
        }

        return;
    }

    if (label?.textContent && label.textContent.substr(-1, 1) === '*') {
        label.textContent = label.textContent.substr(0, label.textContent.length - 1);
    }

    placeholder.removeAttribute('disabled');
    countryStateSelect.removeAttribute('required');
}


function preprocessStateData(data) {
    return data.reduce((index, province) => {
        index[province.id] = {id: province.id, name: province.name, translated: province.translated, children: {}};

        province.children?.forEach(city => {
            const cityData = {id: city.id, name: city.name, translated: city.translated, children: {}};
            index[province.id].children[city.id] = cityData;
            city.children?.forEach(area => {
                cityData.children[area.id] = {id: area.id, name: area.name, translated: area.translated};
            });
        });

        return index;
    }, {});
}
