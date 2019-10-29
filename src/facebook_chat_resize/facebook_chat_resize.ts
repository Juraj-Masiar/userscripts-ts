import {windowLoadedPromise} from '../utils/page_loaded_ready';
import {DynamicStyle} from '../utils/dynamic_style';
import {timeoutPromise} from '../utils/utils_module';


DynamicStyle.loadCSS(`
.opened {
  width: 400px !important;
}
`);

windowLoadedPromise.then(async () => {
    await timeoutPromise(1000);

    document.querySelectorAll<HTMLElement>('div.titlebar')
        .forEach(titleNode => {
            titleNode.onclick = async () => {
                console.log('user clicked');
                await timeoutPromise(1000);
                document.querySelectorAll<HTMLElement>('div.titlebar')
                    .forEach(titleNode => {
                        const body = titleNode.nextElementSibling as HTMLElement;
                        body.style.height = '500px';

                    })
            }
        })
})

