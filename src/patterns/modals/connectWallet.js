import React,{ useState} from 'react'

//IMPORTING WEB3

import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'


//IMPORTING STYLESHEETS

import '../styles/patterns/connectwallet.scss'

//IMPORTING COMPONENTS

import { Button } from '../components'

//IMPORTING STORE COMPONENTS

import { UserContext } from '../store/contexts'

//IMPORTING MEDIA ASSETS

import metamasklogo from '../assets/images/metamasklogo.png'

//EXPORTING METHODS






export const checkNetwork=async() =>{
  const provider = await detectEthereumProvider()
  const web3 = new Web3(provider)
  const network=await web3.eth.net.getId()
  if(network == 56) return true
  else return false
}




const ConnectWallet = ({ setIsConnected,variant, isCorrectModal }) => {

  //INITIALIZING HOOKS

    const { userDispatch } = React.useContext(UserContext)
    const [network,setNetwork] = useState(false)

    //INITIALIZING FUNCTIONS AND METHODS
    
    const connect = async () => {
        // CONNECTING METAMASK WALLET

        // checkNetwork().then(async(res) => {
        //   if(res){

            try {
              if (window.ethereum) {
                window.web3 = new Web3(window.ethereum)
                await window.ethereum.enable()
    
                if (window.ethereum.selectedAddress) {
    
                  const res= await balance()
                  const collections=await collectibleBalance()

                  let data={
                    address:window.ethereum.selectedAddress,
                    balance: res,
                    collectibles: collections,
                    isConnected:true
                  }
    
                  userDispatch({
                    type: 'CONNECT',
                    payload: {
                      address: window.ethereum.selectedAddress,
                      balance: res,
                      collectibles: collections,
                      isConnected:true
                    },
                  })
                  sessionStorage.setItem("userDetails",JSON.stringify(data))
                  isCorrectModal(false)
                  setIsConnected(false)
                }
              }
            } catch (err) {
              console.log(err)
            }
          // }else{
          //   setNetwork(true)
          // }
        // })
      }

    return (
        <div className="connect">
            {
              variant==="wrongnet" || network ? <h2>Wrong Network</h2> : (
                <>
                <img 
              src={metamasklogo} 
              alt="metamask logo" 
              width={148} 
            />
            <h3>Connect your Metamask Wallet to continue</h3>
            </>
              )
            }
            <Button className="secondary" onClick={() => connect()}>
                Connect Wallet
            </Button>
        </div>
    )
}

//EXPORTING THE FUNCTIONAL COMPONENT

export default ConnectWallet
