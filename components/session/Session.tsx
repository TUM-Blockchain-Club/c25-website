'use client';

import { Button } from '@/components/button';
import { Text } from '@/components/text';
import { Session as SessionModel } from '@/model/session';
import { ClockIcon, SewingPinIcon } from '@radix-ui/react-icons';

import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { contentfulImageLoader } from '@/util/contentfulImageLoader';
import { Clock, MapPin } from 'lucide-react';
export type SessionElement = React.ElementRef<'div'>;
export type SessionProps = React.ComponentPropsWithoutRef<'div'> & {
  session: SessionModel;
};

export const Session = React.forwardRef<SessionElement, SessionProps>(
  (props, ref) => {
    const { session, className, ...divProps } = props;
    const [clamped, setClamped] = useState<boolean>(true);
    const [isLineClampClamped, setIsLineClampClamped] =
      useState<boolean>(false);
    const lineClampRef = useRef<HTMLParagraphElement>(null);
    const [active, setActive] = useState(false);

    useEffect(() => {
      const checkLineClamping = () => {
        if (lineClampRef.current) {
          const lineClampElement = lineClampRef.current;
          setIsLineClampClamped(
            lineClampElement.scrollHeight > lineClampElement.clientHeight
          );
        }
      };

      checkLineClamping();

      // Re-check on window resize
      window.addEventListener('resize', checkLineClamping);

      return () => {
        window.removeEventListener('resize', checkLineClamping);
      };
    }, [lineClampRef]);

    const { startTime, endTime } = {
      startTime: new Date(session.startTime),
      endTime: new Date(session.endTime),
    };

    return (
      <div
        {...divProps}
        className={classNames(
          className,
          'border w-full flex p-4 flex-col gap-4 bg-gradient-to-b from-black bg-opacity-60',
          {
            'to-[#14532d]/60': session.track === 'Education Track', // Dark forest green
            'to-[#665200]/60': session.track === 'Research Track', // Deep gold-brown
            'to-[#1e3a8a]/40': session.track === 'Ecosystem Track', // Deep blue (Tailwind blue-900)
            'to-[#4c0608]/60': session.track === 'Regulation Track', // Deep red / oxblood
            'to-[#1a012e]': session.track === 'Academic Track', // Very dark purple
            'to-[#134e4a]/60': session.track === 'Application Track', // Teal-950 (deep cyan-green)
          }
        )}
        ref={ref}
      >
        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-col md:flex-row justify-between w-full gap-1">
            <div
              className={classNames('flex-grow w-full', {
                'md:max-w-[450px]': !session.isSpecialSession,
                'md:max-w-[400px]': session.isSpecialSession,
              })}
            >
              <Text
                textType={'sub_title'}
                as={'p'}
                className="text-wrap w-full"
              >
                {session.title}
              </Text>
            </div>
            <div className="grid grid-cols-2 min-h-fit gap-2 h-fit text-center w-[240px] justify-end">
              {session.isSpecialSession && (
                <div className="rounded-[5px] min-w-fit border h-fit">
                  <Text textType={'small'} className="text-white">
                    Keynote
                  </Text>
                </div>
              )}
              {session.type && (
                <div className="rounded-[5px] border h-fit">
                  <Text textType={'small'} className="text-white">
                    {session.type}
                  </Text>
                </div>
              )}
              {session.track && (
                <div
                  className={classNames(
                    'border rounded-[5px] h-fit col-start-2',
                    {
                      'border-green-400': session.track === 'Education Track',
                      'border-yellow-400': session.track === 'Research Track',
                      'border-blue-400': session.track === 'Ecosystem Track',
                      'border-amber': session.track === 'Research Track',
                      'border-[#F87171]': session.track === 'Regulation Track',
                      'border-[#c084fc]': session.track === 'Academic Track',
                      'border-teal-400': session.track === 'Application Track',
                    }
                  )}
                >
                  <Text
                    textType={'small'}
                    className={classNames({
                      'text-[#bbf7d0]': session.track === 'Education Track', // Light mint green
                      'text-[#fef08a]': session.track === 'Research Track', // Soft yellow
                      'text-[#bfdbfe]': session.track === 'Ecosystem Track', // Light blue
                      'text-[#fca5a5]': session.track === 'Regulation Track', // Light red
                      'text-[#E9D5FF]': session.track === 'Academic Track', // Lavender
                      'text-[#99f6e4]': session.track === 'Application Track', // Light teal
                    })}
                  >
                    {session.track}
                  </Text>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-x-8 flex-col md:flex-row">
            <div className="flex items-center gap-1">
              <MapPin className="text-white" />
              <Text>{session.room}</Text>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="text-white" />
              <Text>
                {startTime.toLocaleDateString('en-DE', {
                  weekday: 'short',
                  timeZone: 'Europe/Berlin',
                })}
                ,{' '}
                {startTime.toLocaleTimeString('en-DE', {
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'Europe/Berlin',
                })}{' '}
                -{' '}
                {endTime.toLocaleTimeString('en-DE', {
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'Europe/Berlin',
                  timeZoneName: 'short',
                })}
              </Text>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="text-white cursor-pointer select-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                onClick={() => setActive(!active)}
              >
                {active && (
                  <path
                    d="M6 9a6 6 0 0 1 12 0c0 3.93 1.02 5.3 2.28 6.62A1 1 0 0 1 20 17H4a1 1 0 0 1-.28-1.38C5.02 14.3 6 12.93 6 9Z"
                    fill="currentColor"
                  />
                )}
                <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col text-wrap">
          <Text
            ref={lineClampRef}
            className={classNames('w-full text-wrap', {
              'line-clamp-3': clamped,
              'line-clamp-none': !clamped,
            })}
          >
            {session.description}
          </Text>
          {isLineClampClamped && (
            <Text
              onClick={() => setClamped(!clamped)}
              className={classNames('cursor-pointer', {
                'text-green-400': session.track === 'Education Track',
                'text-yellow-400':
                  session.track === 'Research Track' || !session.track,
                'text-blue-400': session.track === 'Ecosystem Track',
                'text-orange-400': session.track === 'Research Track',
                'text-red-400': session.track === 'Regulation Track',
                'text-[#E9D5FF]': session.track === 'Academic Track',
                'text-teal-400': session.track === 'Application Track',
              })}
            >
              {clamped ? 'Show More' : 'Show Less'}
            </Text>
          )}
          {session.registrationLink && (
            <div className="mt-5 mb-4">
              <Button asChild>
                <Link
                  href={session.registrationLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Register for Workshop
                </Link>
              </Button>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div>
            Speaker{session.speakers && session.speakers.length > 1 && 's'}:
          </div>
          <div className="grid md:grid-cols-2 gap-2">
            {session.speakers &&
              session.speakers.map((speaker, index) => (
                <>
                  <div className="flex gap-2 items-start" key={index}>
                    {speaker.profilePhoto && (
                      <Link href={speaker.url || '#'}>
                        <Image
                          src={speaker.profilePhoto}
                          loader={
                            speaker.profilePhoto
                              ? contentfulImageLoader
                              : undefined
                          }
                          alt={speaker.name}
                          width={48}
                          height={48}
                        />
                      </Link>
                    )}
                    <div className="flex flex-col max-w-48">
                      <Text key={index}>{speaker.name}</Text>
                      <Text key={index} textType="small">
                        {speaker.description}
                      </Text>
                    </div>
                  </div>
                </>
              ))}
            {(!session.speakers || session.speakers.length === 0) && (
              <Text>Coming soon...</Text>
            )}
          </div>
        </div>
      </div>
    );
  }
);
Session.displayName = 'Session';

export default Session;
