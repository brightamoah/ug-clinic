// usePiniaWebpackHotHMR.ts

import {
    Pinia,
    SetupStoreDefinition,
    StoreDefinition,
    StoreGeneric,
    _ActionsTree,
    _GettersTree,
    getActivePinia,
} from "pinia";

type StoreForHMR = SetupStoreDefinition<string, unknown> | StoreDefinition;

export function usePiniaWebpackHotHMR(
    hot: webpack.Hot,
    store: StoreForHMR | StoreForHMR[]
) {
    hot.accept();
    const stores = Array.isArray(store) ? store : [store];
console.log(stores)

    stores.forEach((store) => {
        hot.dispose((data) => {
            (data as any).initialUseStoreId = store.$id;
        });
        const piniaAccept = acceptWebpackHMRUpdate(store.$id, hot);
        piniaAccept({ ...store });
        // console.log(piniaAccept({ ...store }))
        
    });
}

/**
 * Checks if a function is a StoreDefinition.
 *
 * @param fn - object to test
 * @returns true if fn is a StoreDefinition
 */
export const isUseStore = (fn: any): fn is StoreDefinition => {
    return typeof fn === "function" && typeof fn.$id === "string";
};

type PiniaPlus = Pinia & {
    _s: Map<string, StoreGeneric>;
};

export function acceptWebpackHMRUpdate(
    initialUseStoreId: string,
    hot: webpack.Hot
) {
    // strip as much as possible from iife.prod
    if (!__DEV__) {
        return () => { };
    }
    return (newModule: any) => {
        // @ts-expect-error
        const pinia: PiniaPlus | undefined = hot.data?.pinia || getActivePinia();
        if (!pinia) {
            // this store is still not used
            return;
        }

        // preserve the pinia instance across loads
        // hot.data.pinia = pinia // FIXME: this doesn't work as data does not let us set functions.

        for (const exportName in newModule) {
            const useStore = newModule[exportName];
            if (isUseStore(useStore) && pinia._s.has(useStore.$id)) {
                // console.log('Accepting update for', useStore.$id)
                const id = useStore.$id;

                if (id !== initialUseStoreId) {
                    console.warn(
                        `[Pinia]: The id of the store changed from "${initialUseStoreId}" to "${id}". Reloading.`
                    );
                    // return import.meta.hot.invalidate()
                    return hot.invalidate();
                }

                const existingStore: StoreGeneric = pinia._s.get(id)!;
                if (!existingStore) {
                    console.log('[Pinia]: skipping hmr because store doesn\'t exist yet');
                    return;
                }
                console.log(`[Pinia]: HMR accepted for store "${id}"`);
                useStore(pinia, existingStore);
            }
        }
    };
}