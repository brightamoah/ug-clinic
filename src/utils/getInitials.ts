
const useGetInitials = (name?: string) => {
    if (!name) return ""; // Handle undefined or empty name
    const names = name.split(" ");
    if (names.length === 1) {
        return (names[0].charAt(0) + (names[0].charAt(1) || '')).toUpperCase(); // Handle single name case
    } else {
        return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase(); // Handle multiple names
    }
};

export { useGetInitials };