import { OpenSIPS } from '../src/main.ts'
import { mf_process_maxfwd_header } from '../src/modules/maxfwd/index.ts'
import { has_totag } from '../src/modules/sipmsgops/index.ts';

const app = new OpenSIPS();

app.set_core_parameters('debug', '10')
app.set_core_parameters('check_via', '1')
app.set_core_parameters('disable_core_dump', 'yes')

app.listen('udp', '127.0.0.1', 5060)
app.listen('tcp', '127.0.0.1', 5060)
app.listen('tls', '127.0.0.1', 5061)
app.listen('ws', '127.0.0.1', 5066)

app.on('error', (err: any) => {
    console.error(err);
});

app.on('request', (req: any) => {
    if (mf_process_maxfwd_header(req, 10) ){

    }
    if (has_totag(req)){

    } else {
        req.drop()
    }
})

app.on('listening', () => {
    console.log(`Server is listening on`);
});