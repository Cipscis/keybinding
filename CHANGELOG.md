# Keybinding Changelog

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Todo

* The options currently only apply to the last item
* Remove ctrlKey option and add modifiers (with +) to the keyString
* Allow capturing 'A' vs 'a' etc.?

### Added

* There are aliases for certain key names.

### Changed

* Options passed to `bind` are now expected in an object instead of as separate arguments.
* Key sequences are now passed as strings instead of arrays.
* Keypresses are never recorded while the focus is in a password field.

### Removed

* The `bind` and `bindSequence` (and `unbind` and `unbindSequence`) methods have been combined into just `bind` and `unbind`.

## [1.0.0] - 2021-06-30

### Added

* Initial commit
