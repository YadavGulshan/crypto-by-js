export function getProvider() {
    if ("solana" in window) {
        const provider = window.solana;
        if (provider.isPhantom) {
            return provider;
        }
    } else {
        window.open("https://www.phantom.app/", "_blank");
    }
}