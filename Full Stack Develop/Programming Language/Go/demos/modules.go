package demos

import (
	"proglang/internal/logx"
	"proglang/internal/shapes" // the import path = module name/directory; the package name is the last segment
)

// Modules demonstrates packages / imports / visibility.
// Key points:
//  1. Go's unit of encapsulation is the "package", not the file; one package can be split across multiple files.
//  2. Export rules look only at the initial letter's case: uppercase exports, lowercase is package-private — no public/private keyword.
//  3. Import with the full path module/dir, and reference with the package name prefix: shapes.CircleArea.
//  4. init() runs automatically when the package is imported, before main, for one-time initialization.
//  5. The internal/ directory is a special convention: it can only be imported by code within its parent directory's subtree.
func Modules() {
	logx.Title("14 Packages / imports / visibility")

	logx.Note("calling an exported function: only uppercase-initial names are accessible across packages")
	logx.Show("shapes.CircleArea(2)", shapes.CircleArea(2))
	logx.Show("shapes.Pi (exported constant)", shapes.Pi)

	logx.Note("shapes.square is unexported (lowercase); you literally can't write it here — blocked at compile time")

	logx.Note("init() already ran automatically at import; the state is exposed through an exported function")
	logx.Show("shapes.Loaded()", shapes.Loaded())

	logx.Note("the internal/ directory: only code within the proglang subtree can import it, an enforced encapsulation boundary")
}
