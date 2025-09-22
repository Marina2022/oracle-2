"use client"

import React, {useEffect, useState} from "react"
import {useMediaQuery} from 'react-responsive';
import {Button} from "@/components/ui/button"
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip"
import {Copy, Share2} from "lucide-react"
import {FaTelegramPlane, FaWhatsapp, FaVk} from "react-icons/fa"

interface ShareMenuProps {
  url: string
  text?: string
}

const ShareMenu = ({url, text = ""}: ShareMenuProps) => {

  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => setMounted(true), [])

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const encodedUrl = encodeURIComponent(url)
  const encodedText = encodeURIComponent(text)

  const links = {
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
    vk: `https://vk.com/share.php?url=${encodedUrl}&title=${encodedText}`,
  }

  const iconButton =
    "w-8 h-8 p-2 rounded-full bg-gray-200 hover:bg-gray-100 flex items-center justify-center border border-border bg-transparent dark:bg-transparent dark:border-gray-700"

  const isMobile = useMediaQuery({maxWidth: 767});

  const handleMobileShare = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    if (navigator.share) {
      try {
        await navigator.share({
          title: text || document.title,
          text,
          url
        })
      } catch (err) {
        // пользователь отменил или браузер не поддерживает
        console.error('Share canceled or not supported', err)
      }
    } else {
      // fallback
      alert('Ваш браузер не поддерживает нативный шэринг')
    }
  }

  if (!mounted) return null

  if (isMobile) return (
    <Button
      onClick={handleMobileShare}
      className="bg-transparent hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5">
      <Share2 className=" w-4 h-4"/>
    </Button>
  )

  return (
    <div className="flex items-center gap-3">
      {/* Telegram */}
      <a href={links.telegram} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
        <Button className={iconButton} variant="outline">
          <FaTelegramPlane className="w-3 h-3 text-sky-500"/>
        </Button>
      </a>

      {/* WhatsApp */}
      <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
        <Button className={iconButton} variant="outline">
          <FaWhatsapp className="w-4 h-4 text-green-500"/>
        </Button>
      </a>

      {/* VK */}
      <a href={links.vk} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
        <Button className={iconButton} variant="outline">
          <FaVk className="w-4 h-4 text-blue-600"/>
        </Button>
      </a>

      {/* Copy link */}
      <Tooltip open={copied}>
        <TooltipTrigger asChild>
          <Button
            onClick={handleCopy}
            className={iconButton}
            variant="outline"
          >
            <Copy className="w-4 h-4 dark:text-gray-300 text-foreground "/>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-primary">
          Ссылка скопирована!
        </TooltipContent>
      </Tooltip>
    </div>
  )
}

export default ShareMenu