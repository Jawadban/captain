
# Installing dependencies:

Please install dependencies by running:

```
npm install
```

# Linking Step commands to node server:

In order to run the code by entering Step1, Step2,... in the 
terminal run:
```
npm link
```
# Yahoo Finance Api for historical quotes etc is offline:

Yahoo Finance Api for historical quotes etc is offline 
for good and will not be available anymore so Steps4 and 5 will not run.

# Builds:

Sorry did not have much time to implement Web app but React, Webpack, Babel
and RESTful Express server is working...

You can start the Express Node server running React by:
```
npm start
```
# Step1:

Input Step1 in the terminal once you are at the root directory.
This will save the current price for the share in `fund_prices.json`.

# Step 2:

Input Step2 in the terminal and the program will read and retrieve relevant information 
from the static files and output portfolio worth of the client in this form:

```
$ step2
Vanguard Total Stock Market Index Fund Admiral:31 shares at $60.3 ea. -- $1869.30
Vanguard Long-Term Bond Index:115 shares at $13.97 ea. -- $1606.55
Vanguard Total International Bond Index Admiral:26 shares at $21.83 ea. -- $567.58
Vanguard 500 Index Admiral:4 shares at $223.45 ea. -- $893.80
Vanguard Total International Stock Index Admiral:49 shares at $28.03 ea. -- $1373.47
Vanguard REIT Index Admiral:5 shares at $116.44 ea. -- $582.20
Total: $ 6892.90
```

Step2 also saves all the data about the shares in one file in JSON format `combinedData.json` 
so we dont have to read and write multiple files.

# Step 3:

Input Step3 in the terminal which retrieves the relevant data from `combinedData.json` and render Asset Breakdown in from:

```
$ Step3
Asset Class Breakdown
  U.S. Stocks: 43.78%
  U.S. Bonds: 25.46%
  International Bonds: 8.99%
  International Stocks: 21.76%
```




