import dns2 from 'dns2';
const {Packet, TCPClient} = dns2;
const dns = new dns2({dns: '1.1.1.1'});

const startDns = (localIp) => {
    const server = dns2.createUDPServer(async (request, send, rinfo) => {
        try {
            const response = Packet.createResponseFromRequest(request);
            const [question] = request.questions;
            const {name} = question;
            const result = await dns.resolveA(name);
            response.answers = result.answers;
            if(name.endsWith("localh.app")) {
                for(const ANSWER of response.answers) {
                    ANSWER.address = localIp;
                }
            }
            console.log(response.answers);
            send(response);
        } catch (e) {
            console.log(e);
        }
    });
    server.on('request', (request, response, rinfo) => {
        console.log(request.header.id, request.questions[0]);
    });
    server.listen(53);
}

export {startDns}