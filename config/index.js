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
    MAIN_NET_WS = 'ws://127.0.0.1:8545',
    MAIN_NET_HTTP= 'HTTP://127.0.0.1:8545',
    MONGO_URI,
} = parsed;
