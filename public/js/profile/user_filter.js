const USER_COMPONENTS = document.querySelectorAll('.user_info_container')
const SELECTS = document.querySelectorAll('[data-filter="select"]')

const hide = target => target.classList.add('hide')
const show = target => target.classList.remove('hide')

const show_required = (parameter, target_value, element) => {
    if(parameter.value === target_value)
    show(element)
}

const filter_by = (select, selector) =>{
    USER_COMPONENTS.forEach(component => {
        
        if(select.value){
            const TARGET_VALUE = component.querySelector(selector).innerText 
            hide(component)
            show_required(select, TARGET_VALUE, component)
            
        }else{
            show(component)
        }
    })
}

const DEPARTMENT_SELECT = document.querySelector('#department_filter')
DEPARTMENT_SELECT.addEventListener('change', ()=>{
    filter_by(DEPARTMENT_SELECT, '[data-info="department"]')
})
const CARGO_SELECT = document.querySelector('#cargo_filter')
CARGO_SELECT.addEventListener('change', ()=>{
    filter_by(CARGO_SELECT, '[data-info="cargo"]')
})

const find_permissions = element => {
    const permissions = {
        adm: element.querySelector('[data-info="adm"]'),
        editor: element.querySelector('[data-info="editor"]'),
    }
    return permissions
}

const filter_by_permission = target_permission => {
    USER_COMPONENTS.forEach(component => {
        hide(component)

        const permission = find_permissions(component)
        switch(target_permission){
            case 'adm': 
                permission.adm ? show(component) : false
                break
            case 'editor': 
                permission.editor ? show(component) : false
                break
            case 'common': 
                !permission.adm && !permission.editor ? show(component) : false
                break
            default: show(component); break
        }
    })
}
const PERMISSION_SELECT = document.querySelector('[data-filter="permission"]')
PERMISSION_SELECT.addEventListener('change', ()=>{
    filter_by_permission(PERMISSION_SELECT.value)
})