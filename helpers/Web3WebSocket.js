import Web3 from 'web3';
import {blockAndTransactionToDB} from './sync'
    import {MAIN_NET_WS} from '../config'


const web3 = new Web3(new Web3.providers.WebsocketProvider(MAIN_NET_WS));
export const subscribeBlock=async ()=>{
    var subscription = web3.eth.subscribe('newBlockHeaders', function(error, result){
        if (!error) {
            console.log(result);

            return;
        }

        console.error(error);
    })
        .on("connected", function(subscriptionId){
            console.log(subscriptionId);
        })
        .on("data", function(blockHeader){
            console.log(blockHeader);
            (async()=>{
                await blockAndTransactionToDB(blockHeader.number);
            })()
        })
        .on("error", console.error);

}
