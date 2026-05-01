import Cookies from 'js-cookie';
import { BaseURL, NormalHeaderAPI } from './apiNeed';
import { combinePath } from '../Tools/tools';



export async function createGame() {
    const url = combinePath(BaseURL,`/Match/CreateGame`);

    const res = await fetch(url, {
        method: "POST",
        headers: NormalHeaderAPI
    });

    if (!res.ok) throw new Error("Failed to start meet");

    return await res.json();
}

export async function joinMeeting(roomID, name, modir = false) {
    const url = combinePath(BaseURL,`/user/GetMeetingURL?modir=${modir}&meetid=${roomID}&nick=${name}&pass=30009800`);

    const res = await fetch(url, {
        method: "GET",
        headers: {
        headers: NormalHeaderAPI
        }
    });

    if (!res.ok) throw new Error("Failed to start meet");

    return await res.json();
}

export async function Login(uname, pass) {
    const url = combinePath(BaseURL,`/user/LoginUserPanel`);

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "accept": "*/*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: uname,
            password: pass
        })
    });
    console.log(res)
    if (!res.ok) throw new Error("Failed to login");
    let json = await res.json()
    if (json.status != 200)
        throw new Error(json.message)
    return json;
}

export async function SignUp(nick, uname, pass, mail, role) {
    const url = combinePath(BaseURL,`/user/SignInUserPanel`);

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "accept": "*/*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Name: nick,
            Email: mail,
            username: uname,
            password: pass,
            explain: role
        })
    });
    console.log(res)
    if (!res.ok) throw new Error("Failed to login");
    let json = await res.json()
    if (json.status != 200)
        throw new Error(json.message)
    return json;
}


export async function VerifyToken() {
    const url = combinePath(BaseURL,`/user/VerifyToken`);

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "accept": "*/*",
            "Content-Type": "application/json",
            "vc2AuthNorm": Cookies.get("vc2AuthNorm")
        },
        body: JSON.stringify({
        })
    });
    if (!res.ok)
        if (res.status == 401)
            return {
                status : 401
            }
        else
            throw new Error("Failed to login");
    let json = await res.json()
    return json;
}
