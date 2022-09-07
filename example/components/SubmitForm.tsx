import React,{Component} from 'react';
import { StyleSheet, TextInput, View,TouchableWithoutFeedback,Alert,Keyboard, TouchableOpacity,Text,Linking} from 'react-native';
import {NavigationParams,NavigationScreenProp,NavigationState} from 'react-navigation';
import PaymentPage from './PaymentPage';

export interface Props{
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State{
  version:string; //refer to api docs
  CID:string; //integration credential MerchantID
  signature:string; //integration credential Signature Key
  v_currency:string;
  v_amount:string;
  v_cartid:string;//unique cart id
  callbackurl:string;
  productionEnvironment:boolean;
  returnurl:string; //payment response page navigator destination name
  v_billemail:string; //optional
  v_billphone:string; //optional
  v_firstname:string; //optional
  v_lastname:string; //optional
  v_productdesc:string;  //optional
  v_billstreet:string; //optional
  v_billpost:string; //optional
  v_billcity:string; //optional
  v_billstate:string; //optional
  v_billcountry:string; //optional
  webview:boolean
}

interface ResponseState{
  CID:string;
  POID:string;
  PaymentType:string;
  amount:string;
  cartid:string;
  companyName:string;
  currency:string;
  description:string;
  email:string;
  status:string
}

class SubmitForm extends Component<Props,State> {
  constructor(props:any) {
    super(props);
    this.state = {
      version:'',
      CID:'',
      signature:'',
      v_currency:'',
      v_amount:'',
      v_cartid:'',
      callbackurl:'',
      productionEnvironment:false,
      returnurl:'',
      v_billemail:'',
      v_billphone:'',
      v_firstname:'',
      v_lastname:'',
      v_productdesc:'',
      v_billstreet:'',
      v_billpost:'',
      v_billcity:'',
      v_billstate:'',
      v_billcountry:'',
      webview:false
    };
  }

  submitHandler = () =>{
    if(isNaN(parseFloat(this.state.v_amount))){
      return Alert.alert("Warning!","Amount is required!");
    }

    Keyboard.dismiss();
    const currentDate = (+new Date()).toString();
    //Minimun Request Param
    this.setState({
      version:"1.5.0",
      CID:"M161-U-33", //your user id
      signature:"oAhVwtUxfrop4cI", //integration api key
      v_currency:"MYR",
      v_cartid:currentDate,
      callbackurl:"https://paymentdemo.gkash.my/callback.php",
      v_billemail:"gkashdemo@gkash.com",
      productionEnvironment:false,
      webview:true
    },() =>this.render);
  }

  submitHandler2 = () =>{
    if(isNaN(parseFloat(this.state.v_amount))){
      return Alert.alert("Warning!","Amount is required!");
    }

    Keyboard.dismiss();
    const currentDate = (+new Date()).toString();
    //Minimun Request Param
    this.setState({
      version:"1.5.0",
      CID:"M102-U-1", //your user id
      signature:"FbHPEBlAyB6JriN", //integration api key
      v_currency:"MYR",
      v_cartid:currentDate,
      callbackurl:"https://paymentdemo.gkash.my/callback.php",
      v_billemail:"gkashdemo@gkash.com",
      productionEnvironment:false,
      webview:true
    },() =>this.render);
  }

  handleResponse = (response:ResponseState) =>{
    this.setState({
      webview:false,
      v_amount:''
    },() => this.props.navigation.navigate('ResponsePage',response));
  }

  render(){
    if(this.state.webview){
      return <PaymentPage param={this.state} handleResponse={this.handleResponse} />
    }
    return(
      <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
          <View style={styles.InputContainer}>
              <TextInput
                placeholder="Enter Amount"
                style={styles.input}
                blurOnSubmit
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType="numeric"
                onChangeText={e => this.setState({v_amount:e})}
                value={this.state.v_amount}
                />
              <View style={styles.ButtonContainer}>
                  <TouchableOpacity style={styles.button} onPress={this.submitHandler}>
                  {/* <TouchableOpacity style={styles.button} onPress={this._onSubmit}> */}
                    <Text style={{color:'white'}}>SUBMIT</Text>
                  </TouchableOpacity>
              </View>
          </View>
        </TouchableWithoutFeedback>
  );
  }
}

const styles = StyleSheet.create({
    input:{
      borderColor: '#238cd0',
      borderWidth: 1,
      padding: 10,
      width: '80%',
      marginBottom:20
    },
    InputContainer: {
      flex: 1,
      alignItems: 'center',
      paddingTop:20
    },
    ButtonContainer:{
      flexDirection:"row",
      justifyContent:"center",
      borderRadius:15,
      borderColor: 'white',
      borderWidth: 1,
      backgroundColor:'#238cd0'
    },
    button:{
      alignItems: 'center',
      backgroundColor: '#238cd0',
      padding: 10
    }
  });

export default SubmitForm;