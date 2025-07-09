class NonmemHighlighter {
    constructor() {
        // Define color scheme
        this.colors = {
            comment: '#6a9955',
            numeric: '#b5cea8',
            controlRecord: '#569cd6',
            advantTrans: '#4ec9b0',
            recordName: '#9cdcfe',
            string: '#ce9178',
            keyword: '#c586c0',
            parameter: '#dcdcaa',
            reserved: '#ff6b6b'
        };
        
        // Apply styles to document
        this.applyStyles();
        
        // Define syntax patterns
        this.patterns = [
            // Comments
            {
                pattern: /;.*$/gm,
                className: 'nm7-comment'
            },
            
            // Control records ($DATA, $PROBLEM, etc.)
            {
                pattern: /\$[A-Za-z]+/g,
                className: 'nm7-control-record'
            },
            
            // ADVAN/TRANS routines
            {
                pattern: /\b(ADVAN\d+|TRANS\d+)\b/g,
                className: 'nm7-advant-trans'
            },
            
            // Reserved values with parentheses
            {
                pattern: /\b([A]\(\d+\)|ALAG\d+|[F]\d+|THETA\(\d+\)|ETA\(\d+\)|DADT\(\d+\)|EPS\(\d+\))/g,
                className: 'nm7-reserved'
            },
            
            // Record names (long list from grammar)
            {
                pattern: /\b(Q|CL|CL\d*|V\d*|KA\d*|V4IPRED|IWRES|NORESCALE|RESCALE|NPOPETAS|POPETAS|ONLYREAD|NCOMPARTMENTS|NCOMP|COMP|NCM|NCOMPS|NPARAMS|NEQUILIBRIUM|NPARAMETERS|COMPARTMENT|LINK|TO|AND|MARGINALS|ETAS|MSFO|RECOMPUTE|CONDITIONAL|UNCONDITIONAL|OMITTED|DIAGONAL|DIAG|BLOCK|FIXED|FIX|VARIANCE|STANDARD|SD|COVARIANCE|CORRELATION|CORRELATON|CORR|ALLOFFFIX|FIRSTFIXED|PRINCIPAL|UNIT|ORD0|ORDZERO|NOORD0|NOORDZERO|ABS0|ABZERO|ABSZERO|AB0|NOABS0|NOAB0|NOABZERO|NOABSZERO|FIRSTONLY|FIRSTRECONLY|FIRSTRECORDONLY|OBSONLY|FROM|CONDITIONAL|UNCONDITIONAL|VS|OMITTED|NORMAL|UNIFORM|NEW|NONP|NONPARAMETRIC|ONLYSIM|ONLYSIMULATION|REQUESTFIRST|REQUESTSECOND|PREDICTION|NOPREDICTION|TRUE|SUBPROBLEMS|SUBPROPS|NSUBPROBLEMS|NSUBPROBS|NSUB|SUBROUTINES|TOL|SCOPE|ITERATIONS|PRINT|NOPRINT|NITERATIONS|BY|FILE|NOHEADER|ONEHEADER|NOFORWARD|FORWARD|APPEND|NOAPPEND|NUMBERPOINTS|NUMBERPTS|NUMPOINTS|NUMPTS|ABORT|NOABORT|NOABORTFIRST|NRD|NONE|RESET|NORESET|WARNINGMAXIMUM|WARNMAXIMUM|WARN|WMAX|DATAMAXIMUM|DMAX|DATA|DMAXIMUM|ERRORMAXIMUM|ERRMAXIMUM|EMAX|COMRES|COMSAV|DERIV2|DES|ONLYTHETA|ONLY-THETA|ONLYETA|ONLY-ETA|ONLYSIGMA|ONLY-SIGMA|LEVEL|DEGREES|DOUBLESIDED|LEFTSIDED|RIGHTSIDED|DOUBLESIDE|LEFTSIDE|RIGHTSIDE|DOUBLE-SIDED|LEFT-SIDED|RIGHT-SIDED|DOUBLE-SIDE|LEFT-SIDE|RIGHT-SIDE|DATA|
