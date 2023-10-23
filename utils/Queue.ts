export interface IQueue<T> {
    enqueue(element: T): void;
    dequeue(): T | undefined;
    front(): T | null;
    size(): number;
    isEmpty(): boolean;
    clear(): void;
    queue(): T[];
}

/**
 * A data structure implementing FIFO (first in, first out) behavior
 */
export function Queue<T>(initialCollection: T[] = []): IQueue<T> {
    // Private collection
    let collection: T[];
    
    function initQueue(): IQueue<T> {
        collection = initialCollection;

        return {
            enqueue,
            dequeue,
            clear,
            front,
            queue,
            isEmpty,
            size
        }
    }

    initQueue();

    /**
     * Adds an element to the back of the queue
     * 
     * @param {T} element The element to be added
     */
    function enqueue(element: T) {
        collection.push(element);
    }

    /**
     * Removes and returns the element from the front of the queue
     * 
     * @returns The removed element
     */
    function dequeue(): T | undefined {
        return collection.shift();
    }

    /**
     * 
     * @returns The element at the front of the queue if present, else null
     */
    function front(): T | null {
        return collection[0] ?? null;
    }

    /**
     * 
     * @returns Total number of elements in the queue
     */
    function size(): number {
        return collection.length;
    }

    /**
     * 
     * @returns True if the queue is empty
     */
    function isEmpty(): boolean {
        return size() === 0;
    }

    /**
     * Removes all the elements from the queue
     */
    function clear(): void {
        while (!isEmpty()) {
            dequeue();
        }
    }

    /**
     * 
     * @returns Returns an array with all the elements in the queue
     */
    function queue(): T[] {
        return [...collection];
    }

    return initQueue();
}