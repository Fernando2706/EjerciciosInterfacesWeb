import React, {FC, useState} from 'react';
import Input from '../input/input'
import Text from '../text/text'

const Container: FC=()=>{
    const[text,setText]=useState<string>("");
    const update=(a:string)=>{
        setText(a);
    }

    return(
        <div>
            <Input text={text} update={update}></Input>
        </div>
    );
}

export default Container;