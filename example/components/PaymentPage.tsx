import React,{Component} from 'react';
import { StyleSheet, View, ActivityIndicator,Linking} from 'react-native';
import { WebView } from 'react-native-webview'
import queryString from 'query-string';
var forge = require('node-forge');
forge.options.usePureJavaScript = true;

interface Props{
  param:requestParam,
  handleResponse: (response:ResponseState) => void;
}

interface requestParam{
  version:string;
  signature:string;
  CID:string;
  v_cartid:string;
  v_amount:string;
  v_currency:string;
  productionEnvironment:boolean;
}

interface State{
  version:string;
  signature:string;
  CID:string;
  v_cartid:string;
  v_amount:string;
  v_currency:string;
  productionEnvironment:boolean;
  signatureKey:string;
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

class PaymentPage extends Component<Props,State> {
  webviewRef = React.createRef();

  responseState : {
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

  constructor(props:any){
    super(props);

    this.state ={
      version:this.props.param.version,
      signature : this.props.param.signature,
      CID : this.props.param.CID,
      v_cartid : this.props.param.v_cartid,
      v_amount : this.props.param.v_amount,
      v_currency : this.props.param.v_currency,
      productionEnvironment: this.props.param.productionEnvironment,
      signatureKey:'',
    }

    this.responseState = {
      CID:"",
      POID:"",
      PaymentType:"",
      amount:"",
      cartid:"",
      companyName:"",
      currency:"",
      description:"",
      email:"",
      status:"",
    }
  };


  webViewgoback() {
    const webviewRef = React.useRef<HTMLElement>(null);
    console.log(webviewRef);

    if (webviewRef.current) webviewRef.current.goBack();
  }

  componentDidMount(){
    const amount = parseFloat(this.state.v_amount).toFixed(2).replace(".","");
    const hashString = (this.state.signature +";" + this.state.CID + ";" + this.state.v_cartid + ";" + amount + ";" + this.state.v_currency).toUpperCase();

    this.GenerateSignature(hashString);
  }

  GenerateSignature(hashString:string){
    const md = forge.md.sha512.create();
    md.update(hashString);
    const signatureKey = md.digest().toHex();
    this.setState({signatureKey:signatureKey});
  }

  HandleError = (event:any) =>{
    console.log("Error= " + event);
    this.responseState.status = "error";
    this.props.handleResponse(this.responseState);
  }

  HandleNavigationStateChange = (event:any) =>{

    if(event.loading === false){
      let url = event.url.split('?');
      const queryData = queryString.parse(url[1]);
      const returnUrl = url[0];
      console.log(url);
      console.log(queryData);
      console.log(returnUrl);


      if(returnUrl == "https://api-staging.pay.asia/api/return.aspx")
      {
        this.responseState = {
          CID:queryData.CID!.toString(),
          POID:queryData.POID!.toString(),
          PaymentType:queryData.PaymentType!.toString(),
          amount:queryData.amount!.toString(),
          cartid:queryData.cartid!.toString(),
          companyName:queryData.companyName!.toString(),
          currency:queryData.currency!.toString(),
          description:queryData.description!.toString(),
          email:queryData.email!.toString(),
          status:queryData.status!.toString(),
        }

        setTimeout(() => {
          this.props.handleResponse(this.responseState)
        }, 2000);
      }

      if(returnUrl == "https://api.gkash.my/api/return.aspx")
      {
        this.responseState = {
          CID:queryData.CID!.toString(),
          POID:queryData.POID!.toString(),
          PaymentType:queryData.PaymentType!.toString(),
          amount:queryData.amount!.toString(),
          cartid:queryData.cartid!.toString(),
          companyName:queryData.companyName!.toString(),
          currency:queryData.currency!.toString(),
          description:queryData.description!.toString(),
          email:queryData.email!.toString(),
          status:queryData.status!.toString(),
        }

        setTimeout(() => {
          this.props.handleResponse(this.responseState)
        }, 2000);
      }

    }

  };

  LoadingIndicatorView() {
    return (
      <ActivityIndicator
        color="#009b88"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    );
  }

  HandleShouldStartLoadWithRequest = (request:any) =>{
    const { url } = request;
    if (url.includes('app.apaylater.com') || url.includes("onlinepayment.boost-my.com") || url.includes("shopee.com")
      || url.includes("boostorium.com")) {
      Linking.openURL(url);
      return false;
    }
    return true;
  }

  render(){
    let url = "https://api-staging.pay.asia/api/paymentform.aspx";

    if(this.state.productionEnvironment){
      url = "https://api.gkash.my/api/paymentform.aspx";
    }

    const postData = "<html><body onload='document.forms[0].submit();'>" +
                      "<form action='" + url + "' method='post'>"+
                      "<input name='version' type='hidden' value='" +  this.state.version +"' />"+
                      "<input name='CID' type='hidden' value='" +  this.state.CID +"'/>" +
                      "<input name='v_cartid' type='hidden' value='" + this.state.v_cartid + "'/>" +
                      "<input name='v_firstname' type='hidden' value='" + 'Gkash Payment'+ "'/>" +
                      "<input name='v_currency' type='hidden' value='" + this.state.v_currency +"'/>"+
                      "<input name='v_amount' type='hidden' value='" + this.state.v_amount + "'/>"+
                      "<input name='v_billemail' type='hidden' value='" + 'testing123@gkash.com' + "'/>"+
                      "<input name='v_billphone' type='hidden' value='" + '01234567890' + "'/>"+
                      "<input name='signature' type='hidden' value='" + this.state.signatureKey + "'/>"+
                      "<input name='returnurl' type='hidden' value='" + 'gkash://returntoapp'+ "'/>"+
                      "</form></body></html>";

    return(
      <View style={{flex:1}}>
          <WebView
            renderLoading={this.LoadingIndicatorView}
            source={{html:postData}}
            //source={{uri:testURL}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            onError={e => this.HandleError(e)}
            onNavigationStateChange={e => this.HandleNavigationStateChange(e)}
            onShouldStartLoadWithRequest = {e => this.HandleShouldStartLoadWithRequest(e)}
            originWhitelist={['https://*','apaylater://']}
            allowsBackForwardNavigationGestures
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: "center",
  }
});

export default PaymentPage;