function activePetsButton (category){
    const categoryBtnList = document.getElementsByClassName('category-btn');
    for(const categoryBtn of categoryBtnList){
        categoryBtn.classList.add('btn-outline', 'rounded-none')
        categoryBtn.classList.remove('rounded-full')
    }

     const activeCategoryBtn = document.getElementById(`btn-${category}`);
        activeCategoryBtn.classList.remove('btn-outline', 'rounded-none')
        activeCategoryBtn.classList.add('rounded-full')

}