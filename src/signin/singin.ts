import URI from "urijs";
import {lineConfig} from "../config/line-config";
import Axios from "axios";
import {User} from "../type/User";

const LINE_AUTHORIZE_URL = "https://access.line.me/oauth2/v2.1/authorize";
const LINE_TOKEN_URL = "https://api.line.me/oauth2/v2.1/token";
const LINE_PROFILE_URL = "https://api.line.me/v2/profile";

export const signinWithLine = () => {
  const redirectUri = URI(window.location.href).query({}).pathname("/signin/line").readable();

  const state = lineConfig.lineStateCode;
  const url = URI(LINE_AUTHORIZE_URL).query({
    response_type: "code",
    client_id: lineConfig.channelId,
    redirect_uri: redirectUri,
    state,
    scope: "openid profile"
  }).readable();
  window.location.href = url
};

type TokenResponse = {
  access_token: string
  expires_in: number
  id_token: string
  refresh_token: string
  scope: string
  token_type: string
}

type ProfileResponse = {
  displayName: string
  userId: string
  pictureUrl?: string
}

export const getUserFromCode = async (code: string): Promise<User> => {
  const data = URI().query({
    "grant_type":"authorization_code",
    code,
    "redirect_uri":URI(window.location.origin).pathname("/signin/line").readable(),
    "client_id": lineConfig.channelId,
    "client_secret": lineConfig.channelSecret
  }).query();
  
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  const tokenResponse = await Axios.post<TokenResponse>(LINE_TOKEN_URL, data, config);

  const {
    access_token
  } = tokenResponse.data;
  
  const profileResponse = await Axios.get<ProfileResponse>(LINE_PROFILE_URL, {headers: {Authorization: `Bearer ${access_token}`}});
  
  const {
    displayName,
    userId,
    pictureUrl
  } = profileResponse.data;

  return {
    displayName,
    userId,
    pictureUrl
  }
};
