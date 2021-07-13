type PropertySelector = {[propertyKey: string]: string};

const targetPropertySelectorMap = new Map<string, PropertySelector>();

export function LookUpElement(selector: string): PropertyDecorator {
    return (target, propertyKey) => {
        if (targetPropertySelectorMap.get(target.constructor.name)) {
            const targetPropertySelector = {...targetPropertySelectorMap.get(target.constructor.name), [propertyKey]: selector}
            targetPropertySelectorMap.set(target.constructor.name, targetPropertySelector);
        } else {
            targetPropertySelectorMap.set(target.constructor.name, {[propertyKey]: selector});
        }
    }
}

export function initWithLookupElement(target: Object, element: HTMLElement) {
    const propertySelector = targetPropertySelectorMap.get(target.constructor.name)!;
    Object.entries(propertySelector).forEach(([propertyKey, selector]) => {
        (target as any)[propertyKey] = element.querySelector(selector)!;
    })
}
