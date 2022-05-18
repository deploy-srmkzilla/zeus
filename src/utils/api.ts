import { Event, User } from "../types/global";
import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "https://events-api.srmkzilla.net/api/",
  headers: {
    "X-Access-Token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTI4MjcyNjQsImlzcyI6ImVzaEBtYWlsLmNvbSJ9.QtN7csw5SoMv3YEWW4BO9fa9s50zwPEsye1e8gSZW9I",
  },
});

export const fetchEvents = async (): Promise<Event[] | null> => {
  try {
    const res = await instance.get("events");
    return res.data;
  } catch (err) {
    return null;
  }
};

export const postEvent = async (payload: Event): Promise<any> => {
  try {
    const res = await instance.post("event", payload);
    console.log(payload.prizes, payload.speaker);
    console.log(res);

    if (res.data) {
      payload.speaker.forEach((speaker) => (speaker.slug = payload.slug));
      const speakerRes = await postSpeaker(payload.speaker as any);
    }
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const postSpeaker = async (payload: any): Promise<any> => {
  try {
    const res = await instance.post("event/speaker", payload[0]);
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const fetchSingleEvent = async (
  slug: string,
): Promise<Event[] | null> => {
  try {
    if (slug) {
      const res = await instance.get(`event/${slug}`);
      return res.data;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const fetchUserByEvent = async (
  slug: string,
): Promise<User[] | null> => {
  try {
    if (slug) {
      const res = await instance.get("users", { params: { slug } });
      return res.data;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const sendMails = async (payload: string[]): Promise<any> => {
  try {
    console.log("email to", payload);
  } catch (err) {
    console.log(err);
  }
};

export const upload = async (slug: string, payload: any) => {
  const res = await instance.post(`event/upload/cover?slug=${slug}`, payload, {
    headers: {
      "accept": "application/json",
      "Accept-Language": "en-US,en;q=0.8",
      "Content-Type": `multipart/form-data;`,
      "X-Access-Token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTI4MjcyNjQsImlzcyI6ImVzaEBtYWlsLmNvbSJ9.QtN7csw5SoMv3YEWW4BO9fa9s50zwPEsye1e8gSZW9I",
    },
  });
  console.log(res);

  return res.data;
};

export const updateEvent = async (
  slug: string,
  payload: Event,
): Promise<any> => {
  try {
    const res = await instance.put(`event/upload/cover?slug=${slug}`, payload);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const updateSpeaker = async (payload: Event): Promise<any> => {
  try {
    const res = await instance.put("event", payload);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
