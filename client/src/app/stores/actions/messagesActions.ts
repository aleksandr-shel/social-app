import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { setHubConnection } from "../slices/messagesSlice";
import { RootState } from "../store";



export const createHubConnection = ():ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async (dispatch, getState)=>{
        const hubConnection:HubConnection = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_MESSAGES_URL + '')
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();
        hubConnection.start().catch(error => console.log('Error establishing the connection', error))


        hubConnection.on('test-receive', (test_receive:string)=>{
            console.log(test_receive)
        })


        dispatch(setHubConnection(hubConnection));
    }
}


export const getMessagingPartners = ():ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch)=>{

    }
}