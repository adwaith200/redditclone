import * as actionTypes from './actiontypes';
import Axios from '../../axiosbackend';

export const loginsuccess=(token,userid)=>{
    return {
        type:actionTypes.authsuccess,
        token,
        userid
    }
}

export const loginfail=(err)=>{
    return {
        type:actionTypes.authfail
    }
}

export const logout=()=>{
    return dispatch=>{
        localStorage.clear('token');
        localStorage.clear('userid');
        dispatch({type:actionTypes.logout});
    }
}

export const loginstart=(email,password)=>{
    return async dispatch=>{
        dispatch({type:actionTypes.authstart});
        try{
            const logindata=await Axios({
                method:'POST',
                url:'/user/login',
                data:{
                    email,
                    password
                }
            });
            localStorage.setItem('token',logindata.data.token);
            localStorage.setItem('userid',logindata.data.data.id);
            dispatch(loginsuccess(logindata.data.token,logindata.data.data.id));
        }catch(err)
        {
            dispatch(loginfail());
        }
    }
}

export const autologin=()=>{
    return dispatch=>{
        const token=localStorage.getItem('token');
        if(token)
        {
            const userid=localStorage.getItem('userid');
            dispatch(loginsuccess(token,userid));
        }
        else
        {
            dispatch(logout());
        }
    }
}

export const signupstart=(name,email,password,confirmpassword)=>{
    return async dispatch=>{
        dispatch({type:actionTypes.authstart});
        try{
            const signupdata=await Axios({
                method:'POST',
                url:'/user/signup',
                data:{
                    name,
                    email,
                    password,
                    confirmpassword
                }
            });
            localStorage.setItem('token',signupdata.data.token);
            localStorage.setItem('userid',signupdata.data.data.id);
            dispatch(loginsuccess(signupdata.data.token,signupdata.data.data.id));
        }catch(err)
        {
            console.log(err.response);
            dispatch(loginfail());
        }
    }
}

export const resetpassword=(token,password,confirmpassword)=>{
    return async dispatch=>{
        dispatch({type:actionTypes.authstart});
        try{
            const passworddata=await Axios({
                method:'POST',
                url:'/user/resetpassword/'+token,
                data:{
                    password,
                    confirmpassword
                }
            });
            dispatch({type:actionTypes.resetpassword});
        }catch(err)
        {
            console.log(err.response);
            dispatch(loginfail());
        }
    }
}