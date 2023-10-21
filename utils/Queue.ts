/**
 * A data structure implementing FIFO (first in, first out) behavior
 */
export class Queue<T> {
    private collection: T[];
    
    constructor(initialCollection: T[] = []) {
        this.collection = initialCollection;
    }

    /**
     * Adds an element to the back of the queue
     * 
     * @param {T} element The element to be added
     */
    enqueue(element: T) {
        this.collection.push(element);
    }

    /**
     * Removes and returns the element from the front of the queue
     * 
     * @returns The removed element
     */
    dequeue(): T | undefined {
        return this.collection.shift();
    }

    /**
     * 
     * @returns The element at the front of the queue if present, else null
     */
    front(): T | null {
        return this.collection[0] ?? null;
    }

    /**
     * 
     * @returns Total number of elements in the queue
     */
    size(): number {
        return this.collection.length;
    }

    /**
     * 
     * @returns True if the queue is empty
     */
    isEmpty(): boolean {
        return this.size() === 0;
    }

    /**
     * Removes all the elements from the queue
     */
    clear(): void {
        while (!this.isEmpty()) {
            this.dequeue();
        }
    }

    /**
     * 
     * @returns Returns an array with all the elements in the queue
     */
    queue(): T[] {
        return [...this.collection];
    }
}
