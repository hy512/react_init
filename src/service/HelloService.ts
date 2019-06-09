

export class HelloService {
    public loadHello(): Promise<string> {
        return new Promise((resolve, reject) => {
            window.setTimeout(() => resolve("loaded hello."), 3000);
        });
    }
}