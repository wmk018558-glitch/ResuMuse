import { useState, useCallback } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, File, X, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ResumeUpload() {
  const [dragOver, setDragOver] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files[0]
    if (f) setFile(f)
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) setFile(f)
  }, [])

  const removeFile = () => setFile(null)

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-8">
        {!file ? (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={cn(
              'flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-12 transition-colors cursor-pointer',
              dragOver
                ? 'border-primary bg-primary/5'
                : 'border-muted-foreground/25 hover:border-primary/50'
            )}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <div className="rounded-full bg-primary/10 p-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-base font-medium">
                点击上传或拖拽简历文件到这里
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                支持 PDF、Word、HTML 格式
              </p>
            </div>
            <input
              id="file-upload"
              type="file"
              accept=".pdf,.doc,.docx,.html,.htm"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>
        ) : (
          <div className="flex items-center gap-4 rounded-lg border bg-muted/30 p-4">
            <div className="rounded-full bg-primary/10 p-2">
              <File className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
            <Button variant="ghost" size="icon" onClick={removeFile}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {file && (
          <div className="mt-4 flex justify-center">
            <Button className="gap-2">
              <SparklesIcon />
              开始智能解析
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function SparklesIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v4m0 14v-4m-7-7h4m10 0h-4m-6.5 2.5L5.5 5.5m13 13-3-3m-7 0-3 3m13-13-3 3" />
    </svg>
  )
}
