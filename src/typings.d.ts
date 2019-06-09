declare module "*.css" {
    interface IClassNames {
        [className: string]: string;
    }
    const classNames: IClassNames;
    export = classNames;
}

interface CordovaPluginDevice {
    readonly platform: "Android" | "BlackBerry 10" | "browser" | "iOS" | "WinCE" | "Tizen" | "Mac OS X";
    readonly uuid: string;
    readonly isVirtual: boolean;
    readonly serial: string;
    readonly model: string;
    readonly manufacturer: string;
}
declare const device: CordovaPluginDevice;