export function getProvider() {
    // Property 'solana' does not exist on type 'Window & typeof globalThis'.ts(2339)
    // @ts-ignore
    if (window.solana) {
        // @ts-ignore
        return window.solana;
    }
    // @ts-ignore
    if (globalThis.solana) {
        // @ts-ignore
        return globalThis.solana;
    }
    throw new Error('solana provider not found');
}
//     if ("solana" in window) {
//         const provider = window.solana;
//         if (provider.isPhantom) {
//             return provider;
//         }
//     } else {
//         window.open("https://www.phantom.app/", "_blank");
//     }
// }