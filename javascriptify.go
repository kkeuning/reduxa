package reduxa

import (
	"strings"
	"unicode"
)

// JavaScriptify, based on Goify makes a valid JavaScript identifier out of any string.
// It does that by removing any non letter and non digit character and by making sure the first
// character is a letter or "_".
// JavaScriptify produces a "CamelCase" version of the string, if firstUpper is true the first character
// of the identifier is uppercase otherwise it's lowercase.
func JavaScriptify(str string, firstUpper bool) string {
	runes := []rune(str)

	// remove trailing invalid identifiers (makes code below simpler)
	runes = removeTrailingInvalid(runes)

	w, i := 0, 0 // index of start of word, scan
	for i+1 <= len(runes) {
		eow := false // whether we hit the end of a word

		// remove leading invalid identifiers
		runes = removeInvalidAtIndex(i, runes)

		if i+1 == len(runes) {
			eow = true
		} else if !validIdentifier(runes[i]) {
			// get rid of it
			runes = append(runes[:i], runes[i+1:]...)
		} else if runes[i+1] == '_' {
			// underscore; shift the remainder forward over any run of underscores
			eow = true
			n := 1
			for i+n+1 < len(runes) && runes[i+n+1] == '_' {
				n++
			}
			copy(runes[i+1:], runes[i+n+1:])
			runes = runes[:len(runes)-n]
		} else if unicode.IsLower(runes[i]) && !unicode.IsLower(runes[i+1]) {
			// lower->non-lower
			eow = true
		}
		i++
		if !eow {
			continue
		}

		// [w,i] is a word.
		word := string(runes[w:i])
		// is it one of our initialisms?
		if u := strings.ToUpper(word); commonInitialisms[u] {
			if firstUpper {
				u = strings.ToUpper(u)
			} else if w == 0 {
				u = strings.ToLower(u)
			}

			// All the common initialisms are ASCII,
			// so we can replace the bytes exactly.
			copy(runes[w:], []rune(u))
		} else if w > 0 && strings.ToLower(word) == word {
			// already all lowercase, and not the first word, so uppercase the first character.
			runes[w] = unicode.ToUpper(runes[w])
		} else if w == 0 && strings.ToLower(word) == word && firstUpper {
			runes[w] = unicode.ToUpper(runes[w])
		}
		if w == 0 && !firstUpper {
			runes[w] = unicode.ToLower(runes[w])
		}
		//advance to next word
		w = i
	}

	return fixReserved(string(runes))
}

// Reserved JavaScript keywords
var JavaScriptReserved = map[string]bool{
	// JavaScript Reserved Words
	"break":    true,
	"case":     true,
	"comment":  true,
	"continue": true,
	"default":  true,
	"delete":   true,
	"do":       true,
	"else":     true,
	"export":   true,
	"for":      true,
	"function": true,
	"if":       true,
	"import":   true,
	"in":       true,
	"label":    true,
	"new":      true,
	"return":   true,
	"switch":   true,
	"this":     true,
	"var":      true,
	"void":     true,
	"while":    true,
	"with":     true,
	// ECMAScript Reserved Words
	"catch":    true,
	"class":    true,
	"const":    true,
	"debugger": true,
	"enum":     true,
	"extends":  true,
	"finally":  true,
	"super":    true,
	"throw":    true,
	"try":      true,
	// Others, not yet exhaustive
	"alert":       true,
	"confirm":     true,
	"open":        true,
	"print":       true,
	"NaN":         true,
	"Date":        true,
	"constructor": true,
	"assign":      true,
	"location":    true,
	"Location":    true,
	"window":      true,
	"Window":      true,
	// Java Keywords reserved by JavasScript
	"abstract":     true,
	"boolean":      true,
	"byte":         true,
	"char":         true,
	"double":       true,
	"false":        true,
	"final":        true,
	"float":        true,
	"goto":         true,
	"implements":   true,
	"instanceof":   true,
	"int":          true,
	"interface":    true,
	"long":         true,
	"native":       true,
	"null":         true,
	"package":      true,
	"private":      true,
	"protected":    true,
	"public":       true,
	"short":        true,
	"static":       true,
	"synchronized": true,
	"throws":       true,
	"transient":    true,
	"true":         true,
}

// fixReserved appends an underscore on to JavaScript reserved keywords.
func fixReserved(w string) string {
	if JavaScriptReserved[w] {
		w += "_"
	}
	return w
}

// validIdentifier returns true if the rune is a letter or number
func validIdentifier(r rune) bool {
	return unicode.IsLetter(r) || unicode.IsDigit(r)
}

// removeTrailingInvalid removes trailing invalid identifiers from runes.
func removeTrailingInvalid(runes []rune) []rune {
	valid := len(runes) - 1
	for ; valid >= 0 && !validIdentifier(runes[valid]); valid-- {
	}

	return runes[0 : valid+1]
}

// removeInvalidAtIndex removes consecutive invalid identifiers from runes starting at index i.
func removeInvalidAtIndex(i int, runes []rune) []rune {
	valid := i
	for ; valid < len(runes) && !validIdentifier(runes[valid]); valid++ {
	}

	return append(runes[:i], runes[valid:]...)
}

var commonInitialisms = map[string]bool{
	"API":   true,
	"ASCII": true,
	"CPU":   true,
	"CSS":   true,
	"DNS":   true,
	"EOF":   true,
	"GUID":  true,
	"HTML":  true,
	"HTTP":  true,
	"HTTPS": true,
	"ID":    true,
	"IP":    true,
	"JMES":  true,
	"JSON":  true,
	"JWT":   true,
	"LHS":   true,
	"OK":    true,
	"QPS":   true,
	"RAM":   true,
	"RHS":   true,
	"RPC":   true,
	"SLA":   true,
	"SMTP":  true,
	"SQL":   true,
	"SSH":   true,
	"TCP":   true,
	"TLS":   true,
	"TTL":   true,
	"UDP":   true,
	"UI":    true,
	"UID":   true,
	"UUID":  true,
	"URI":   true,
	"URL":   true,
	"UTF8":  true,
	"VM":    true,
	"XML":   true,
	"XSRF":  true,
	"XSS":   true,
}
