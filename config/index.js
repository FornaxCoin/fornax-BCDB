import {
    config
} from 'dotenv';

const {
    parsed
} = config();

export const {
    MAIN,
    TEST,
    TEST_NET_PORT_HTTP,
    TEST_NET_PORT_WS,
    MAIN_NET_PORT_HTTP,
    MAIN_NET_PORT_WS,
    NET_HTTP,
    NET_WS,
    TEST_NET_HTTP = `${NET_HTTP}${TEST}:${TEST_NET_PORT_HTTP}`,
    TEST_NET_WS = `${NET_WS}${TEST}:${TEST_NET_PORT_WS}`,
    // MAIN_NET_WS = `${NET_WS}${MAIN}:${MAIN_NET_PORT_WS}`,
    // MAIN_NET_HTTP= `${NET_HTTP}${MAIN}:${MAIN_NET_PORT_HTTP}`
    MAIN_NET_WS = 'wss://node.watchfornax.com/ws',
    MAIN_NET_HTTP= 'https://node.watchfornax.com/rpc',
    MONGO_URI,
} = parsed;
