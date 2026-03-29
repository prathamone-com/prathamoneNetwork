$signatureTs = @"
/**
 * ==========================================================
 * AITDL AI AGENT BUILD SIGNATURE
 * ==========================================================
 * Architect    : Jawahar R Mallah
 * Designation  : AI Systems Architect & Author
 * Organization : AITDL Network | PrathamOne
 * Framework    : Autonomous AI Agent Development
 * Authored By  : Jawahar R Mallah
 * Version      : 1.0.0
 * Release Date : 28 March 2026
 * Environment  : Production
 *
 * Signature    : Engineered by Jawahar R Mallah
 * Motto        : Crafted with Logic, Vision & AI
 * ==========================================================
 */

"@

$signatureSql = @"
-- ==========================================================
-- AITDL AI AGENT BUILD SIGNATURE
-- ==========================================================
-- Architect    : Jawahar R Mallah
-- Designation  : AI Systems Architect & Author
-- Organization : AITDL Network | PrathamOne
-- Framework    : Autonomous AI Agent Development
-- Authored By  : Jawahar R Mallah
-- Version      : 1.0.0
-- Release Date : 28 March 2026
-- Environment  : Production
--
-- Signature    : Engineered by Jawahar R Mallah
-- Motto        : Crafted with Logic, Vision & AI
-- ==========================================================

"@

$files = Get-ChildItem -Recurse -File -Include *.ts,*.tsx,*.js,*.jsx,*.sql,*.css | Where-Object { 
    $_.FullName -notmatch 'node_modules|\.next|dist|build|package-lock\.json' 
}

foreach ($file in $files) {
    Write-Host "Signing: $($file.FullName)"
    $content = Get-Content $file.FullName -Raw
    
    # Skip if already signed
    if ($content -match "AITDL AI AGENT BUILD SIGNATURE") {
        Write-Host "Already signed: $($file.Name)"
        continue
    }

    $ext = [System.IO.Path]::GetExtension($file.FullName).ToLower()
    if ($ext -eq ".sql") {
        $finalContent = $signatureSql + $content
    } else {
        $finalContent = $signatureTs + $content
    }

    Set-Content $file.FullName $finalContent -Encoding UTF8
}
