export async function track_L_element_L_change(tracking_X_element: Element){
    return new Promise(resolve => {

        // Создаем экземпляр MutationObserver
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                console.log(mutation);
                resolve(true);
                observer.disconnect();
            });
        });
    
        // Конфигурация изменений, которые мы хотим наблюдать
        var config = { childList: true, subtree: true };
    
        // Начинаем наблюдение
        observer.observe(tracking_X_element, config);
    });
}