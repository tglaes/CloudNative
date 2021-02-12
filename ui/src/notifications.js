import { store } from 'react-notifications-component';

export function notification(title, msg, type, insert = "top", container = "top-right", duration = 5000, onScreen = false, showIcon = false, pauseOnHover = true){
    store.addNotification({
        title: title,
        message: msg,
        type: type,
        insert: insert,
        container: container,
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: duration,
            onScreen: onScreen,
            showIcon: showIcon,
            pauseOnHover: pauseOnHover,
        }
    });
}

export function registrationSuccess(){
   notification(
      "Chat App",
      "Registrierung erfolgreich",
      "success",
      undefined,
      undefined,
      undefined,
      true,
      false,
      true,
   )
}

export function sendMessage(){
    notification(
        "Chat App",
        "Nachricht wurde gesendet",
        "info",
        undefined,
        undefined,
        undefined,
        true,
        false,
        true,
    )
}

export function wrongLoginData(){
    notification(
        "Chat App",
        "Username oder Passwort ungültig",
       "warning",
        undefined,
        undefined,
        undefined,
        true,
        false,
        true,
    );
}