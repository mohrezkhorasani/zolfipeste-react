import Cookies from 'js-cookie';
import { BaseURL, NormalHeaderAPI } from './apiNeed';
import { combinePath } from '../Tools/tools';

export async function fetchRooms() {
    const res = await fetch(combinePath(BaseURL,"/user/GetRooms"), {
        method: "GET",
        headers: NormalHeaderAPI
    });

    if (!res.ok) throw new Error("Failed to fetch rooms");

    const json = await res.json();
    return json.data; // چون ساختار ریسپانس تو همین شکله
}
export async function fetchRoomsPublic(uname =null) {
    const res = await fetch(combinePath(BaseURL,`/user/GetRoomsPublic?username=${uname==null?"":uname}`), {
        method: "GET",
        headers: NormalHeaderAPI,

    });
    console.log(res)
    if (!res.ok) throw new Error("Failed to fetch rooms");

    const json = await res.json();
    return json.data; // چون ساختار ریسپانس تو همین شکله
}
export async function fetchRoom(friendlyID) {
    const res = await fetch(combinePath(BaseURL,`/user/GetRoomByFriendlyID?q=${friendlyID}`), {
        method: "GET",
        headers: NormalHeaderAPI

    });

    if (!res.ok) throw new Error("Failed to fetch rooms");

    const json = await res.json();
    return json.data; // چون ساختار ریسپانس تو همین شکله
}
export async function fetchRoomLive() {
    const res = await fetch(combinePath(BaseURL,`/user/GetLives?q=`), {
        method: "GET",
        headers: NormalHeaderAPI

    });

    if (!res.ok) throw new Error("Failed to fetch rooms");

    const json = await res.json();
    return json.data; // چون ساختار ریسپانس تو همین شکله
}
export async function fetchRoomLivesPublic() {
    const res = await fetch(combinePath(BaseURL,`/user/GetLivesPublic?q=`), {
        method: "GET",
        headers: NormalHeaderAPI

    });

    if (!res.ok) throw new Error("Failed to fetch rooms");

    const json = await res.json();
    return json.data; // چون ساختار ریسپانس تو همین شکله
}
export async function getSlideshows() {
    const res = await fetch(combinePath(BaseURL,`/user/GetSlideShow`), {
        method: "GET",
        headers: NormalHeaderAPI

    });

    if (!res.ok) throw new Error("Failed to fetch rooms");

    const json = await res.json();
    return json.data; // چون ساختار ریسپانس تو همین شکله
}
