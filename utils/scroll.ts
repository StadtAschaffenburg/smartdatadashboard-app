/**
 * Smoothly scrolls to a given element by its ID and adjusts the position.
 * @param elementId The ID of the element to scroll to.
 * @param offset Additional offset to adjust the final scroll position (default: 0).
 */
export const scrollToElement = (
  elementId: string = 'content',
  offset: number = -70,
) => {
  const element = document.getElementById(elementId)
  if (element) {
    const elementTop = element.getBoundingClientRect().top + window.scrollY
    window.scrollTo({
      top: elementTop + offset,
      behavior: 'smooth',
    })
  }
}
