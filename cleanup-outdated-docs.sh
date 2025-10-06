#!/bin/bash

# Cleanup Outdated Documentation
# Run this to remove superseded/redundant docs

echo "🧹 Cleaning up outdated documentation..."

# Remove outdated status docs (superseded by COMPLETION_STATUS.md and AUDIT_RESPONSE.md)
rm -f PLATFORM_AUDIT_CRITICAL.md
rm -f FIXES_APPLIED.md
rm -f FINAL_FIXES_STATUS.md
rm -f DEPLOYMENT_UPDATES.md

echo "✅ Deleted 4 outdated files:"
echo "   - PLATFORM_AUDIT_CRITICAL.md (issues fixed)"
echo "   - FIXES_APPLIED.md (superseded)"
echo "   - FINAL_FIXES_STATUS.md (superseded)"
echo "   - DEPLOYMENT_UPDATES.md (redundant)"

echo ""
echo "📄 Keeping current docs:"
echo "   ✅ README.md"
echo "   ✅ COMPLETION_STATUS.md (latest)"
echo "   ✅ AUDIT_RESPONSE.md (latest)"
echo "   ✅ DEPLOYMENT.md"
echo "   ✅ DATABASE.md"
echo "   ✅ SECURITY.md"
echo "   ✅ DOCUMENTATION_SUMMARY.md"
echo "   ✅ CHANGELOG.md"

echo ""
echo "✨ Documentation cleanup complete!"
