import axios from "axios";

export const quickqueueApiBase = axios.create({
  baseURL: "http://ec2-18-218-116-207.us-east-2.compute.amazonaws.com:10000",
  headers: {
    "Content-Type": "application/json",
  },
});
