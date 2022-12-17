import cv2

# Load the image
image = cv2.imread('test.jpg')

# Convert the image to grayscale
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Blur the image to reduce noise
blurred_image = cv2.GaussianBlur(gray_image, (5, 5), 0)

# Threshold the image to create a binary image
_, thresh = cv2.threshold(blurred_image, 150, 255, cv2.THRESH_BINARY)

# Find contours in the image
contours, _ = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

# Sort the contours by area
contours = sorted(contours, key=cv2.contourArea, reverse=True)

# Select the contour with the largest area
contour = contours[0]

# Use the contour to compute the minimum rotated rectangle
rect = cv2.minAreaRect(contour)

# Compute the size of the t-shirt
width, height = rect[1]
if width > height:
    tshirt_size = width
else:
    tshirt_size = height

# Assign a size label to the t-shirt
if tshirt_size < 20:
    size = 'Extra Small'
elif tshirt_size < 30:
    size = 'Small'
elif tshirt_size < 40:
    size = 'Medium'
elif tshirt_size < 50:
    size = 'Large'
else:
    size = 'Extra Large'

# Print the size of the t-shirt
print('The size of the t-shirt is:', size, tshirt_size)
