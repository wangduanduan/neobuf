# neobuf: like OpenSIPS but full Node.js

wip

```js
import { OpenSIPS } from '../src/main.ts'
import { mf_process_maxfwd_header } from '../src/modules/maxfwd/index.ts'
import { has_totag } from '../src/modules/sipmsgops/index.ts';
import { core_params as cp } from '../src/core_params.ts';

const app = new OpenSIPS();

app.set_core_parameters(cp.log_level, 'info')
app.set_core_parameters(cp.check_via, '1')
app.set_core_parameters(cp.disable_core_dump, 'yes')
app.set_core_parameters(cp.socket, 'udp:127.0.0.1:5060 as 1.2.3.4:5060')
app.set_core_parameters(cp.socket, 'tcp:127.0.0.1:5060 as 1.2.3.4:5060')
app.set_core_parameters(cp.socket, 'tls:127.0.0.1:5061 as 1.2.3.4:5061')
app.set_core_parameters(cp.socket, 'ws:127.0.0.1:5061 as 1.2.3.4:5062')


app.on('error', (err: any) => {
    console.error(err);
});

app.on('request', (req: any) => {
    if (mf_process_maxfwd_header(req, 10)) {

    }
    if (has_totag(req)) {

    } else {
        req.drop()
    }
})

app.on('listening', () => {
    console.log(`Server is listening on`);
});
```

# roadmap
- [ ] sip msg ops
    - [ ] remove_header
    - [ ] add_header
    - [ ] has_header
    - [ ] update_header