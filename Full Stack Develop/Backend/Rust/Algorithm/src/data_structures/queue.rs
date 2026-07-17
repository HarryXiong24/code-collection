use std::collections::VecDeque;

pub struct Queue<T> {
    vec: VecDeque<T>,
}

impl<T> Queue<T> {
    pub fn new() -> Self {
        Queue {
            vec: VecDeque::new(),
        }
    }

    pub fn enqueue(&mut self, item: T) {
        self.vec.push_back(item);
    }

    pub fn len(&self) -> usize {
        self.vec.len()
    }

    pub fn is_empty(&self) -> bool {
        self.vec.is_empty()
    }

    pub fn peek(&self) -> Option<&T> {
        self.vec.front()
    }

    pub fn dequeue(&mut self) -> Option<T> {
        self.vec.pop_front()
    }
}

#[cfg(test)]
mod tests {
    use super::Queue;

    #[test]
    fn starts_empty() {
        let mut q: Queue<String> = Queue::new();

        assert!(q.is_empty());
        assert_eq!(q.dequeue(), None);
        assert_eq!(q.len(), 0);
        assert_eq!(q.peek(), None);
    }

    #[test]
    fn fills_and_empties() {
        let mut q = Queue::new();

        q.enqueue(1);
        q.enqueue(2);
        q.enqueue(3);

        assert!(!q.is_empty());
        assert_eq!(q.len(), 3);
        assert_eq!(q.peek(), Some(&1));

        q.dequeue();
        q.dequeue();
        q.dequeue();

        assert!(q.is_empty());
        assert_eq!(q.dequeue(), None);
        assert_eq!(q.len(), 0);
        assert_eq!(q.peek(), None);
    }

    #[test]
    fn alternate_mutations() {
        let mut q = Queue::new();

        q.enqueue("A");

        assert!(!q.is_empty());
        assert_eq!(q.len(), 1);
        assert_eq!(q.peek(), Some(&"A"));

        q.enqueue("B");

        assert!(!q.is_empty());
        assert_eq!(q.len(), 2);
        assert_eq!(q.peek(), Some(&"A"));

        q.dequeue();

        assert!(!q.is_empty());
        assert_eq!(q.len(), 1);
        assert_eq!(q.peek(), Some(&"B"));

        q.enqueue("C");
        q.enqueue("D");

        assert!(!q.is_empty());
        assert_eq!(q.len(), 3);
        assert_eq!(q.peek(), Some(&"B"));

        q.dequeue();
        q.dequeue();

        assert!(!q.is_empty());
        assert_eq!(q.len(), 1);
        assert_eq!(q.peek(), Some(&"D"));
    }
}
