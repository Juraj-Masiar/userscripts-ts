import {windowLoadedPromise} from '../utils/page_loaded_ready';
import {DynamicStyle} from '../utils/dynamic_style';
import {timeoutPromise} from '../utils/utils_module';



DynamicStyle.loadCSS(`
.opened {
  width: 400px !important;
}
`);

