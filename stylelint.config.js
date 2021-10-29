module.exports = {
   "extends": [
     "stylelint-config-recommended-scss",
     "stylelint-config-recess-order",
     "stylelint-rscss/config",
     "stylelint-config-prettier"
   ],
   "plugins": ["stylelint-scss"],
   "rules": {
     "max-nesting-depth": [
       1,
       {
        "ignore": ["pseudo-classes"],
        "ignoreAtRules": ["include"]
       }
     ]
   }
 }
