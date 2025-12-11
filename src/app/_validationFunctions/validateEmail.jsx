export default function validateEmail(email){
    //大学メルアド用のjavascript正規表現
    const regex = /^.+@shibaura\.ac\.jp$/;
    const isValid = regex.test(email);
    if(isValid == false){
        return ("大学のメールアドレスを入力して下さい");
    }else{
        //エラーがあるなら文字列、無いならnullで強く決めておく。空文字は明示的でないので止める
        return null;
    }
}

