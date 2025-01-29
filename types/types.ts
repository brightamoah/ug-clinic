import { Component } from "nativescript-vue";

export interface route {
   path: RoutePath;
   name?: String;
   component: Component;
   meta?: Object;
}

export type RoutePath =
   | "/"
   | "/details"
   | "/signup"
   | "/login"
   | "/profile"
   | "/bookings"
   | "/chat"
   | "/userSetting"
   | "/dashboard";

export interface navItem {
   route: RoutePath;
   icon: String;
   label: String;
}

export interface Doctor {
   id: Number;
   name: String;
   specialty: String;
   image: String;
   hours: String;
   timeSlots: String[];
}

export interface userDetails {
   id: string;
   name: string;
   email: string;
   profilePhoto?: string;
}

export type AppointmentData = {
   id: string;
   doctor: Doctor["name"];
   date: string;
   time: string;
   status: string;
   createdAt: Date;
   userId: userDetails["id"];
};
