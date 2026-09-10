export default async function decorate(block) {  
    const rows = [...block.children];
    const buttonRows=rows.filter((row)=> row.querySelector('.button-wrapper'));
    if(buttonRows.length){
        const buttonContainer = document.createElement('div');
        buttonContainer.className='hero-button';
        buttonRows.forEach((row)=>{
            const buttonWrapper=row.querySelector('.button-wrapper');
            if(buttonWrapper){
                buttonContainer.append(buttonWrapper);
            }
            row.remove();
        });
        buttonContainer.addEventListener('click',(e)=>{
            e.preventDefault();
            const button =e.target.closest('.button');
            if(!button) return;
            const url = button.getAttribute('href');
            window.location.href=url;
        });
        block.append(buttonContainer);
    }
    
}