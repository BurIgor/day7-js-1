function $(selectors){
    let element = document.querySelector(selectors);
    function html(cont) {
        if (cont != undefined) {
            element.innerHTML = cont;
        }
        return element.innerHTML;
    }
    return {
        html: html
    };
}