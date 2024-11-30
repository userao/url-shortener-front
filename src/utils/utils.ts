const isDevelopment = process.env.NEXT_PUBLIC_MODE === "development";
const hostName = isDevelopment
    ? `${process.env.NEXT_PUBLIC_DEV_BACKEND_HOST}:${process.env.NEXT_PUBLIC_DEV_BACKEND_PORT}`
    : `test:9999`

const routes = {
    createURLRoute: (): string => `${hostName}/urls/create`,
    getURLRoute: (hash: string): string => `${hostName}/urls/${hash}`,
}

export {routes}