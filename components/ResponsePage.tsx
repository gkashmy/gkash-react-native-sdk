import React ,{Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Button} from 'react-native';
import {NavigationParams,NavigationScreenProp,NavigationState} from 'react-navigation';

export interface Props{
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export interface State{
    CID:string;
    POID:string;
    PaymentType:string;
    amount:string;
    cartid:string;
    companyName:string;
    currency:string;
    description:string;
    email:string;
    status:string;
    webview:boolean;
}

class ResponsePage extends Component<Props,State> {
    constructor(props:any){
        super(props);
        //const {params} = props.navigation.state;
        const {params} = props.route;

         this.state ={
            CID:params.CID,
            POID:params.POID,
            PaymentType:params.PaymentType,
            amount:params.amount,
            cartid:params.cartid,
            companyName:params.companyName,
            currency:params.currency,
            description:params.description,
            email:params.email,
            status :params.status,
            webview:false
        }
      };

    render(){
        return(
        <View style={styles.screen}>
            <View style={styles.tableComponenet}>
                <View>
                    <Text>Status</Text>
                    <Text>PO Number</Text>
                    <Text>Amount</Text>
                    <Text>Cart Id</Text>
                    <Text>Payment Type</Text>
                    <Text>Description</Text>
                </View>
                <View>
                    <Text> : {this.state.status}</Text>
                    <Text> : {this.state.POID}</Text>
                    <Text> : {this.state.currency} {this.state.amount}</Text>
                    <Text> : {this.state.cartid}</Text>
                    <Text> : {this.state.PaymentType}</Text>
                    <Text> : {this.state.description}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("SubmitForm",this.state)}>
                    <Text style={{color:'white'}}>Back to Home</Text>
            </TouchableOpacity>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:"center",
        justifyContent:'center'
    },
    tableComponenet: {
      alignSelf: "stretch",
      flexDirection:'row',
      alignItems:"center",
        justifyContent:'center'
    },
    button:{
        alignItems: 'center',
        backgroundColor: '#238cd0',
        padding: 20
      }
  });

export default ResponsePage;